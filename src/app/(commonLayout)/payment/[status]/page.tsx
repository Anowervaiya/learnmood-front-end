import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

export default async function PaymentStatusPage({
  params,
  searchParams,
}: {
 params: Promise<{ status: string }>,
  searchParams: Promise<{
    transactionId?: string;
    message?: string;
    amount?: string;
    status?: string; // optional duplicate from query (not needed)
  }>;
}) {
  const { status } = await params;
  const { transactionId, message, amount } = await searchParams;

  let statusUI;

  if (status === "success") {
    statusUI = (
      <>
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
        <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
      </>
    );
  } else if (status === "fail") {
    statusUI = (
      <>
        <XCircle className="w-20 h-20 text-red-500 mx-auto" />
        <h1 className="text-3xl font-bold text-red-600">Payment Failed!</h1>
      </>
    );
  } else if (status === "cancel") {
    statusUI = (
      <>
        <AlertTriangle className="w-20 h-20 text-yellow-500 mx-auto" />
        <h1 className="text-3xl font-bold text-yellow-600">Payment Cancelled!</h1>
      </>
    );
  } else {
    statusUI = (
      <>
        <AlertTriangle className="w-20 h-20 text-gray-500 mx-auto" />
        <h1 className="text-3xl font-bold text-gray-600">Unknown Payment Status</h1>
      </>
    );
  }

  return (

    <div className="flex justify-center items-center w-full min-h-screen px-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-xl  p-8 text-center space-y-6">
        {statusUI}

        <p className="text-gray-600">{message}</p>

        <div className="bg-gray-100 p-4 rounded-lg flex justify-between text-sm">
          <div>
            <p className="font-semibold">Transaction ID</p>
            <p>{transactionId}</p>
          </div>
          <div>
            <p className="font-semibold">Amount</p>
            <p>{amount} BDT</p>
          </div>
        </div>

        <a
          href="/dashboard"
          className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go to Dashboard
        </a>
      </div>
    </div>
    
  );
}



