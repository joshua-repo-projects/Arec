import { Loading } from "@/components/loading";

export default function LoadingPage() {

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black/30 backdrop-blur-sm z-50">
            <Loading />
        </div>
    )
}