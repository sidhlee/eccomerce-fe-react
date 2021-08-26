import {
	Box,
	Button,
	Container,
	Flex,
	Text,
	Heading,
	Image,
	List,
	ListItem,
} from "@chakra-ui/react";
import { useEffect } from "react";
import {
	Link as ReactRouterLink,
	useLocation,
	useRouteMatch,
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Message from "../../common/components/Message";
import QuantitySelect from "../../common/components/QuantitySelect";
import { useGetVariantByIdQuery } from "../../services/product";
import { addCartItem } from "./cartSlice";
import { ICartItem } from "./cartTypes";

type CartPageProps = {};

interface LocationState {
	search: string;
}

const CartPage: React.FC<CartPageProps> = () => {
	const { params } = useRouteMatch<{ id: string }>();
	const { search } = useLocation<LocationState>();

	const variantId = params.id;
	const qty = search ? search.split("=")[1] : 1;

	const dispatch = useAppDispatch();

	const { cartItems } = useAppSelector((state) => state.cart);

	const { isLoading, error, data: variant } = useGetVariantByIdQuery(variantId);

	useEffect(() => {
		if (variantId && variant) {
			dispatch(
				addCartItem({
					variant: variant.id,
					name: variant.name,
					imageUrl: variant.image_url,
					price: variant.price,
					qty: +qty,
				})
			);
		}
	}, [dispatch, variantId, qty, variant]);

	const handleQuantityChange = (valueString: string, item: ICartItem) => {
		dispatch(
			addCartItem({
				variant: item.variant,
				name: item.name,
				imageUrl: item.imageUrl,
				price: item.price,
				qty: +valueString,
			})
		);
	};

	return (
		<Container maxWidth="container.lg">
			<Flex direction={["column", "row"]}>
				<Box flex="2">
					<Heading as="h1">Shopping Cart</Heading>
					{cartItems.length === 0 ? (
						<Message status="info">
							Your cart is empty{" "}
							<Button as={ReactRouterLink} to="/" ml="auto">
								Go Back
							</Button>
						</Message>
					) : (
						<List mt="5">
							{cartItems.map((item) => (
								<ListItem
									key={item.variant}
									display={["block", "flex"]}
									borderWidth="1px"
									borderRadius="lg"
									padding="3"
								>
									<Box pos="relative" flex="1">
										{/* TODO: fetch thumbnail url from server */}
										<Image
											pos="absolute"
											top="0"
											left="0"
											w="100%"
											h="100%"
											src={item.imageUrl}
											alt={item.name}
											objectFit="contain"
										/>
									</Box>
									<Box flex="1">
										<Text>{item.name}</Text>
									</Box>
									<Box flex="1">
										<Text>${item.price}</Text>
									</Box>
									<Box flex="1">
										<QuantitySelect
											handleQuantityChange={(valueString: string) => {
												handleQuantityChange(valueString, item);
											}}
											labelHidden
										/>
									</Box>
								</ListItem>
							))}
						</List>
					)}
				</Box>
				<Box flex="1"></Box>
			</Flex>
		</Container>
	);
};

export default CartPage;
