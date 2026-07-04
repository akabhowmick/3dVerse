import { Button, Container, Grid, Typography, TextField, Box } from "@mui/material";
import { useState } from "react";
import { useUserContext } from "../../../providers/UserProvider";
import { initialUserValues } from "../../../utils/HelpfulText";

export const Shipping = ({ handleNext }: { handleNext: () => void }) => {
  const [formValues, setFormValues] = useState(initialUserValues);
  const { setUser } = useUserContext();

  const onChange = (e: { target: { name: string; value: string } }) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleNextClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setUser(formValues);
    handleNext();
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Container maxWidth="md">
          <Box component="form" onSubmit={(e) => handleNextClick(e)} className="shipping-form">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography sx={{ fontSize: "1.25rem", marginBottom: "0" }}>
                  Your details
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="firstName"
                  label="First Name"
                  onChange={onChange}
                  value={formValues.firstName}
                  fullWidth
                  variant="standard"
                  required
                  autoComplete="given-name"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="lastName"
                  label="Last Name"
                  onChange={onChange}
                  value={formValues.lastName}
                  fullWidth
                  variant="standard"
                  required
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  label="Email"
                  onChange={onChange}
                  value={formValues.email}
                  fullWidth
                  variant="standard"
                  required
                  type="email"
                  autoComplete="email"
                  inputProps={{ inputMode: "email" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="phone"
                  label="Phone"
                  onChange={onChange}
                  value={formValues.phone}
                  fullWidth
                  variant="standard"
                  required
                  type="tel"
                  autoComplete="tel"
                  inputProps={{ inputMode: "tel" }}
                />
              </Grid>
              <hr />
              <Grid item xs={12}>
                <Typography sx={{ fontSize: "1.25rem", marginBottom: "0" }}>Address</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="addressLine1"
                  label="Address Line 1"
                  onChange={onChange}
                  value={formValues.addressLine1}
                  fullWidth
                  variant="standard"
                  required
                  autoComplete="address-line1"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="city"
                  label="City"
                  onChange={onChange}
                  value={formValues.city}
                  fullWidth
                  variant="standard"
                  required
                  autoComplete="address-level2"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="state"
                  label="State"
                  onChange={onChange}
                  value={formValues.state}
                  fullWidth
                  variant="standard"
                  required
                  autoComplete="address-level1"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="country"
                  label="Country"
                  onChange={onChange}
                  value={formValues.country}
                  fullWidth
                  variant="standard"
                  required
                  autoComplete="country-name"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="zipCode"
                  label="Zip Code"
                  onChange={onChange}
                  value={formValues.zipCode}
                  fullWidth
                  variant="standard"
                  required
                  autoComplete="postal-code"
                  inputProps={{ inputMode: "numeric" }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button fullWidth type="submit" variant="contained" color="primary">
                  Next
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
};
