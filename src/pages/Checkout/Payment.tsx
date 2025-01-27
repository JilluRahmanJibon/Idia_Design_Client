
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js'
import CheckoutForm from '../../components/CheckoutForm/CheckoutForm';


const stripePromise = loadStripe(
	"pk_test_51M7FJQL2FwZDV4iNmlFLtDqb3yDRK4lqaON0OgjvO8IogV2asS24FmzZxYZx1UtS1oS8tMUjIDwCXkfNJol76Uqp00YYgtkFxK"
);
const Payment = () => {
  return (
	  <div className="h-[500px] pt-5">
		  <h1 className='text-2xl text-center py-8'>Payment</h1>
			<div className='w-[300px] mx-auto'>
				<Elements stripe={stripePromise}>
					<CheckoutForm />
				</Elements>
			</div>
		</div>
	);
}

export default Payment
