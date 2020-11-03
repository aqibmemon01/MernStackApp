import React from "react";
import Button from "@material-ui/core/Button";
import { SnackbarProvider, useSnackbar } from "notistack";

 function MyApp(props) {
  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = variant => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(props.msg, { variant });
  };
  handleClickVariant("success").call()
// alert()
  return (
  //   // <React.Fragment>
  //     // <Button onClick={handleClickVariant("success")}>
  //     //   Show success snackbar
  //     // </Button>
      <span></span>
  //   // </React.Fragment>
  );
}

export default function IntegrationNotistack(props) {
  return (
    <SnackbarProvider maxSnack={5}>
      <MyApp msg={props.msg} />
    </SnackbarProvider>
  );
}
