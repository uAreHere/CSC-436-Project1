import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CurrentConversionRates from './CurrentConversionRates';

global.fetch = () =>
	Promise.resolve({
		json: () =>
			Promise.resolve({
				bpi: {
					USD: { rate_float: 50000, rate: '50,000' },
					EUR: { rate_float: 40000, rate: '40,000' },
					GBP: { rate_float: 30000, rate: '30,000' },
				},
			}),
	});

describe('CurrentConversionRates', () => {
	it('renders the component with correct conversion rates and bitcoin values', async () => {
		render(<CurrentConversionRates />);

		await waitFor(() => screen.getByText(/USD = \d+\.\d+ BTC/i));

		expect(screen.getByText(/USD = \d+\.\d+ BTC/i)).toBeInTheDocument();
		expect(screen.getByText(/EUR = \d+\.\d+ BTC/i)).toBeInTheDocument();
		expect(screen.getByText(/GBP = \d+\.\d+ BTC/i)).toBeInTheDocument();
	});
});
