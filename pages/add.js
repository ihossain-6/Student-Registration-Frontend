import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css"
import { Form, useNotification, Button } from "web3uikit"
import { useEffect, useState } from "react";
import studentRegistrationAbi from "../constants/StudentRegistration.json"
import networkMapping from "../constants/networkMapping.json"
import { useMoralis, useWeb3Contract } from "react-moralis";

export default function Home() {
    const {chainId, account, isWeb3Enabled} = useMoralis()
    const chainString = chainId ? parseInt(chainId).toString() : 31337
    const studentRegistrationAddress = networkMapping[chainString].StudentRegistration[0]
    const dispatch = useNotification()

    const {runContractFunction} = useWeb3Contract()

    async function addStudent(data) {
        console.log("Adding new student....")
        const id = data.data[0].inputResult
        const name = data.data[1].inputResult
        const email = data.data[2].inputResult
        const imgHash = data.data[3].inputResult

        const addStudent = {
            abi: studentRegistrationAbi,
            contractAddress: studentRegistrationAddress,
            functionName: "addStudent",
            params: {
                id: id,
                name: name,
                email: email,
                imgHash: imgHash
            },
        }
        await runContractFunction({
            params: addStudent,
            onSuccess: (tx) => handleAddSuccess(tx, id, name, email, imgHash),
            onError: (error) => {
                console.log(error)
            },
        })
    }
    async function handleAddSuccess() {
        dispatch ({
            type: "success",
            message: "Adding student",
            position: "bottomR",
        })
    }
    return (
        <div className={styles.container}>
            <Form 
               onSubmit={addStudent}
               data={[
                 {
                    name: "Id",
                    type: "number",
                    inputWidth: "50%",
                    value: "",
                    key: "id",
                    validation: {
                        required: true
                    }
                 },
                 {
                    name: "Name",
                    type: "text",
                    inputWidth: "100%",
                    value: "",
                    key: "name",
                    validation: {
                        required: true
                    }
                 },
                 {
                    name: "Email",
                    type: "email",
                    value: "",
                    inputWidth: "100%",
                    validation: {
                        regExp: '^[^@s]+@[^@s]+.[^@s]+$',
                        required: true
                    }
                 },
                 {
                    name: "Image Hash",
                    type: "text",
                    value: "",
                    inputWidth: "100%",
                    validation: {
                        required: true
                    }
                 }
               ]}
            />
        </div>
    )
}