import React from 'react';
import history from '../../History';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import '../../CSS/MyCSS.css'


export default function FadeMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };


  const handleClose = (Value) => {
    setAnchorEl(null);
    if(Value!=undefined){
      history.push(Value)
    }
  };

  return (
    <div>
      <Button className="MyDrop" aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
        PAY / REC
      </Button>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={()=>handleClose("/MyPurchase")}>Receivable</MenuItem>
        <MenuItem onClick={()=>handleClose("/MySales")}>Payable</MenuItem>
        <MenuItem onClick={()=>handleClose("/MyItems")}>Check Collect</MenuItem>
        <MenuItem onClick={()=>handleClose("/MyVenders")}>Expence</MenuItem>
        <MenuItem onClick={()=>handleClose("/MyCustomers")}>Income</MenuItem>
      </Menu>
    </div>
  );
}
