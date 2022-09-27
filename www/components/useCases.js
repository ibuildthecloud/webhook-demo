export default function UseCases() {
    return (
        <section className="bg-white border-b py-8">
            <div className="container max-w-5xl mx-auto m-8">
                <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
                    Sample use cases
            </h1>
                <div className="flex flex-wrap flex-col-reverse sm:flex-row">
                    <div className="w-full sm:w-1/2 p-6 mt-6">
                        <img className="w-full md:w-5/5 z-50" src="./images/harbor.png" />
                    </div>
                    <div className="w-full sm:w-1/2 p-6 mt-6">
                        <div className="align-middle">
                            <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
                                Check the content of a payload very easily
                    </h3>
                            <p className="text-gray-600 mb-8">
                                Many applications allows to send events through webhooks, just provide it a webhook
                                endpoints and check the payloads that are sent.
                    </p>
                            <p className="text-gray-600 mb-8">
                                The image on the left is the Harbor registry, it can send webhooks for many types of events. Using a
                                webhook from webhooks.app allows you to quickly understand and demo the content that is sent
                    </p>
                        </div>
                    </div>
                </div>
                <div className="w-full mb-4">
                    <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
                </div>
                <div className="flex flex-wrap">
                    <div className="w-5/6 sm:w-1/2 p-6">
                        <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
                            Send test data easily with just an HTTP POST
                </h3>
                        <p className="text-gray-600 mb-8">
                            webhooks.app is also a very simple backend which allows you to send json payload. You can quickly get the
                            history of your data from the swagger UI or with a good old cURL.
                </p>
                        <p className="text-gray-600 mb-8">
                            It's important to note that the data are only stored for a couple of days, it's not a production environment
                            in any way.
                </p>
                    </div>
                    <div className="w-full sm:w-1/2 p-6">
                        <img className="w-full md:w-5/5 z-50" src="./images/history.png" />
                    </div>
                </div>
            </div>
        </section>
    )
}
