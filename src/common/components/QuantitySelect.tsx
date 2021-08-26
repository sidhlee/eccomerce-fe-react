import {
	FormControl,
	FormLabel,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
} from "@chakra-ui/react";

type QuantitySelectProps = {
	handleQuantityChange: (valueString: string) => void;
	labelHidden?: true;
	defaultValue?: number;
};

const QuantitySelect: React.FC<QuantitySelectProps> = ({
	handleQuantityChange,
	labelHidden,
	defaultValue = 1,
}) => {
	return (
		<FormControl flex="1 1">
			<FormLabel srOnly={labelHidden}>Quantity</FormLabel>
			<NumberInput
				defaultValue={defaultValue}
				min={1}
				onChange={handleQuantityChange}
			>
				<NumberInputField />
				<NumberInputStepper>
					<NumberIncrementStepper />
					<NumberDecrementStepper />
				</NumberInputStepper>
			</NumberInput>
		</FormControl>
	);
};

export default QuantitySelect;
