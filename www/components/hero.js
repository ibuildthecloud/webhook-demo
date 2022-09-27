export default function Hero() {
    return (
        <div className="pt-24">
            <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
                <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
                    <p className="uppercase tracking-loose w-full"></p>
                    <h2 className="my-4 text-5xl font-bold leading-tight">
                        Easy webhooks
                </h2>
                    <p className="leading-normal text-2xl mb-8">
                        Webhook endpoints available for your tests and demos
                </p>
                </div>
                <div className="w-full md:w-3/5 py-6 text-center">
                    <img className="w-full md:w-2/5 z-50" src="./images/webhook.png" />
                </div>
            </div>
        </div>
    )
}