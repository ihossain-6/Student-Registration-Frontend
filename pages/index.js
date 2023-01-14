import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css"
import networkMapping from "../constants/networkMapping.json"
import {useMoralis} from "react-moralis"
import Student from "../components/Student"
import GET_STUDENTS from "../constants/subgraphQueries";
import { useQuery } from "@apollo/client";

export default function Home() {
    const {chainId} = useMoralis()
    const chainString = chainId ? parseInt(chainId).toString() : null
    const studentRegistrationAddress = chainId ? networkMapping[chainString].StudentRegistration[0] : null
    const {loading, error, data} = useQuery(GET_STUDENTS)
    if (loading) return 'Loading...';
    if (error) return <p>Error : {error.message}</p>;

    return (
        <div className="container mx-auto">
            <h1 className="py-4 px-4 font-bold text-2xl">Students</h1>
            <div className="flex flex-wrap">
                    {data.studentAddeds.map(({id, sId, name, email, imgHash}) => (
                        <Student
                           key={id}
                           id={sId}
                           name={name}
                           email={email}
                           imgHash={imgHash}
                           studentRegistrationAddress={studentRegistrationAddress}
                        />
                    ))}
            </div>
        </div>
    )
}