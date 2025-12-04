import Vapi from "@vapi-ai/web"
import { useEffect, useState } from "react"


interface TranscriptMessage {
    role: "user" | "assistant";
    text: string
}

export const useVapi = () => {

    const [vapi, setVapi] = useState<Vapi | null>(null)
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [transcript, setTranscipt] = useState<TranscriptMessage[]>([])


    useEffect(() => {

        const vapiInstance = new Vapi("897c285c-c175-4f5d-995d-6da2ca9b66e2");
        setVapi(vapiInstance);

        vapiInstance.on("call-start", () => {
            setIsConnected(true);
            setIsConnecting(false);
            setTranscipt([]);
        });

        vapiInstance.on("call-end", () => {
            setIsConnected(false);
            setIsConnecting(false);
            setIsSpeaking(false);
        });


        vapiInstance.on("speech-start", () => {
            setIsSpeaking(true);
        })
        vapiInstance.on("speech-end", () => {
            setIsSpeaking(false);
        })

        vapiInstance.on("error", (error) => {
            console.log(error, "VAPI ERROR");
            setIsConnecting(false);
        });

        vapiInstance.on("message", (message) => {
            if (message.type == "transcript" && message.transcriptType == 'final') {
                setTranscipt((prev) => [
                    ...prev, {
                        role: message.role == "user" ? "user" : "assistant",
                        text: message.transcipt
                    }
                ])
            }
        });


        return () => {
            vapiInstance?.stop();
        }

    }, []);


    const startCall = () => {
        setIsConnecting(true);

        if (vapi) {
            vapi.start("90246ddb-e6c2-4b81-95ce-8a2a200a160a")
        }
    }


    const endCall = () => {
        if (vapi) {
            vapi.stop();
        }
    }


    return {
        isSpeaking,
        isConnected,
        isConnecting,
        transcript,
        startCall,
        endCall

    }

}
