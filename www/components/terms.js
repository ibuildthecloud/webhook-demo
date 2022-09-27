export default function Terms() {
    return (
        <section className="bg-white border-b py-8">
            <div className="container max-w-5xl mx-auto m-8">
                <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
                    Terms of usage
                </h1>
                <div className="w-full mb-4">
                    <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
                </div>
                <div className="flex flex-wrap">
                    <div className="w-6/6 sm:w-2/2 p-6">
                        <p className="text-gray-600 mb-8">
                            This application is to be used for test and demo only
                        </p>
                        <p className="text-gray-600 mb-8">
                            The data sent to the webhooks are only stored for a couple of days at most
                        </p>
                        <p className="text-gray-600 mb-8">
                            No sensible data should be sent in those webhooks
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
