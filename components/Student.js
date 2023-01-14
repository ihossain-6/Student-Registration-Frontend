import { useEffect, useState } from "react";
import { useWeb3Contract } from "react-moralis";
import studentRegistrationAbi from "../constants/StudentRegistration.json"
import Image from "next/image";
import { Card } from "web3uikit";

export default function Student({id, name, email, imgHash, studentRegistrationAddress}) {
    const [imgURL, setImgURL] = useState("")
    // const {runContractFunction: seeStudent} = useWeb3Contract ({
    //     abi: studentRegistrationAbi,
    //     contractAddress: studentRegistrationAddress,
    //     functionName: "seeStudent",
    //     params: {
    //         id: id
    //     },
    // })

    async function updateUI() {
        await imgHash
        console.log(`The imgHash is ${imgHash}`)
        if(imgHash) {
            const imageURL = "https://ipfs.io/ipfs/" + imgHash
            setImgURL(imageURL)
        }
    }

    useEffect(() => {
        updateUI()
    })

    console.log(`The image url is ${imgURL}`)

    return (
        <div>
        <Card 
           title = {name}
           description = {email}
        >
            <div className="p-2">
                <div className="flex flex-col item-end gap-2">
                    <div>#{id}</div>
                    <img
                         //loader={() => imgURL}
                         src={imgURL}
                         height="200"
                         width="200"
                    />
                </div>
            </div>
        </Card>
        </div>
    )
}