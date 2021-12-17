import { TextField, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import React from "react";
import OtpInput from "react-otp-input";
import { Layout } from "../../components/Layout";
import { useLogin } from "./useLogin";
import { CircularProgress } from "@material-ui/core";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../../providers/AuthProvider";

const useStyles = makeStyles((theme) => {
  return {
    container: {
      margin: "auto",
      marginTop: theme.spacing(12),
      fontFamily: "Inter",
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "330px",
      },
    },
    title: {
      textAlign: "center",
      marginBottom: theme.spacing(2),
    },
    phoneNumberLogin: {
      marginBottom: 20,
      display: "flex",
      alignItems: "center",
    },
    btn: {
      textTransform: "none",
      padding: theme.spacing(1),
      fontSize: "1rem",
      fontWeight: "bold",
    },
    countryCode: {
      backgroundColor: "#F2F5F7",
      fontSize: 18,
      padding: theme.spacing(1.25),
      borderRadius: "10px",
      marginRight: "0.5rem",
    },
  };
});

export const Login = () => {
  const classes = useStyles();
  const {
    phoneNumber,
    otp,
    error,
    handleOtpChange,
    handlePhoneNumber,
    onPhoneNumberSubmit,
    onOtpSubmit,
    mutation,
  } = useLogin();

  let btnText = "Send OTP";

  if (mutation.isLoading) {
    btnText = <CircularProgress style={{ color: "#ffffff" }} size={30} />;
  }

  if (mutation.isSuccess) {
    btnText = "Submit OTP";
  }

  const onButtonClicked = () => {
    if (mutation.isSuccess) {
      return onOtpSubmit();
    }
    return onPhoneNumberSubmit();
  };

  const navigate = useNavigate();
  const location = useLocation();
  const { isUserLoggedIn } = useAuth();

  useEffect(() => {
    if (isUserLoggedIn) {
      navigate(location?.state?.from || "/");
    }
  }, [isUserLoggedIn, navigate, location]);

  return (
    <Layout>
      <div className={classes.container}>
        <Typography variant="h5" component="h1" className={classes.title}>
          Log In
        </Typography>
        <div className={classes.phoneNumberLogin}>
          <Typography
            className={classes.countryCode}
            component="span"
            color="textSecondary"
          >
            +91
          </Typography>
          <TextField
            onChange={handlePhoneNumber}
            variant="outlined"
            value={phoneNumber}
            label="Enter your phone number"
            error={error?.phoneNumber ? true : false}
            helperText={error?.phoneNumber}
            inputProps={{
              style: {
                fontSize: "1rem",
              },
              maxLength: 10,
              inputMode: "numeric",
            }}
            autoFocus
            required
            fullWidth
          />
        </div>
        {mutation.isSuccess && (
          <OtpInput
            value={otp}
            onChange={handleOtpChange}
            numInputs={6}
            shouldAutoFocus
            isInputNum
            separator={<span> </span>}
            hasErrored={error?.otp ? true : false}
            inputStyle={{
              height: "2rem",
              margin: "0.25rem",
              marginBottom: "1rem",
              display: "flex",
              gap: "0.5rem",
              width: "100%",
              fontSize: "1.25rem",
              borderRadius: 4,
              border: "2px solid rgba(0,0,0,0.3)",
            }}
          />
        )}
        <Button
          className={classes.btn}
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          onClick={onButtonClicked}
        >
          {btnText}
        </Button>
      </div>
    </Layout>
  );
};
