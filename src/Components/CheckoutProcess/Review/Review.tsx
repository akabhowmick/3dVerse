import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useCartContext } from "../../../providers/CartProvider";
import { useUserContext } from "../../../providers/UserProvider";
import { Product } from "../../../Types/interfaces";
import { orderReviewFormId, uploadImagePage } from "../../../utils/ApiKeys";

export default function Review() {
  const { cartItems, finalTotal, clearCart } = useCartContext();
  const { user, order } = useUserContext();

  const addresses = [
    user?.addressLine1 || "",
    user?.city || "",
    user?.state || "",
    user?.country || "",
    user?.zipCode || "",
  ];

  const infoForSeller = [
    { name: "_template_id", value: "table" },
    { name: "_subject", value: `Order Summary for Print#DVerse Order N. - ${order}!` },
    { name: "Email-Address", value: user?.email || "" },
    { name: "Phone-Number", value: user?.phone || "" },
    { name: "Order-Number", value: order },
    { name: "Shipping-Address", value: addresses.join(", ") },
    { name: "Total-Cost", value: "$" + finalTotal.toFixed(2) },
    { name: "_next", value: uploadImagePage },
  ];

  const FormSubmitIoInputs = infoForSeller.map(({ name, value }) => (
    <input type="hidden" key={name} name={name} value={value} />
  ));

  const productToString = (product: Product) => {
    let result = `Product Name: ${product.name}\n`;
    result += `Quantity: ${product.quantity}\n`;
    if (product.requiredCustomizations) {
      result += "Required Customizations:\n";
      product.requiredCustomizations.forEach((customization) => {
        result += `${customization.key}: ${customization.value}\n`;
      });
    }
    if (product.customerChoices) {
      result += "Customer Choices:\n";
      product.customerChoices.forEach((choice) => {
        result += `${choice.name}: ${choice.value}\n`;
      });
    }
    return result;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.submit(); // Manually submits the form
    clearCart(); // Clears cart only after form submission
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {(cartItems || []).map((cartItem) => (
          <ListItem key={cartItem.name} sx={{ py: 1, px: 0 }}>
            <img
              src={cartItem.images?.[0] || ""}
              alt={cartItem.name || "Product image"}
              style={{
                maxWidth: "60px",
                margin: "0.5rem",
                borderRadius: "10px",
              }}
            />
            <ListItemText primary={cartItem.name} secondary={cartItem.desc} />
            <Typography variant="body2">${cartItem.price.toFixed(2)}</Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total (including shipping and taxes)" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ${finalTotal.toFixed(2)}
          </Typography>
        </ListItem>
      </List>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{`${user?.firstName || ""} ${user?.lastName || ""}`}</Typography>
          <Typography gutterBottom>{addresses.join(", ")}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" id="order-number">
            Order Number: #{order}
          </Typography>
          <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
            Please save this number for future reference and for us to use when sending us your
            customizations!!!
          </Typography>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <form action={orderReviewFormId} method="POST" onSubmit={handleSubmit}>
          <input type="hidden" name="_cc" value={user?.email || ""} />
          <input type="text" name="_honey" style={{ display: "none" }} />
          {FormSubmitIoInputs}
          {(cartItems || []).map((product) => (
            <input
              key={product.id}
              type="hidden"
              name={`${product.name} - Order Specifics`}
              value={productToString(product)}
            />
          ))}
          <Button fullWidth type="submit" variant="contained" color="primary">
            <Typography>Upload Images and Personalizations!</Typography>
          </Button>
        </form>
      </Grid>
    </React.Fragment>
  );
}
