import { Suspense } from "react";
import CheckoutSuccessPage from "./CheckoutSuccessPage";

export default function CheckoutSuccessWrapper() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-gray-500">Loading checkout...</div>}>
      <CheckoutSuccessPage />
    </Suspense>
  );
}


