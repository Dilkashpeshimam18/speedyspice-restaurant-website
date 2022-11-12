import React, { useState, useContext, useEffect } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CartContext from '../../store/cartContext';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const Header = ({ setIsPane, searchFood, setSearchFood }) => {
    const { items, addItem, numberOfItem, setNumberOfItem } = useContext(CartContext)
    const [open, setOpen] = React.useState(false);
    const [totalCart, setTotalCart] = useState(0)


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const quantity = items.reduce((currNum, item) => {
        return currNum + item.quantity

    }, 0)
    localStorage.setItem('quantity', quantity)
    useEffect(() => {

        setNumberOfItem(quantity)
        localStorage.setItem('totalCart', numberOfItem)
        // console.log(totalCart)
        let value = localStorage.getItem('totalCart')
        setTotalCart(value)


    }, [items, addItem])
    return (
        <div className='header'>
            <div className='header__left'>
                <h4>PIZZA INN</h4>
            </div>
            <div className='header__right'>
                <div className='navLink__container'>
                    <Link to='/' style={{ textDecoration: 'none' }}> <p className='navLink'>HOME</p></Link>
                </div>
                <div className='navLink__container'>
                    <Link to='/menu' style={{ textDecoration: 'none' }}><p className='navLink'>MENU</p></Link>
                </div>

                {/* <div className='navLink__container'>
                    <Link to='/contact' style={{ textDecoration: 'none' }}><p className='navLink'>CONTACT</p></Link>
                </div> */}
                <div onClick={() => setIsPane(true)} style={{ marginTop: '15px', cursor: 'pointer' }} className='navLink__container'>
                    <ShoppingCartIcon />
                </div>

                <div style={{ marginTop: '15px', cursor: 'pointer' }} className='navLink__container'>
                    {totalCart}
                </div>
                <div onClick={handleClickOpen} style={{ cursor: 'pointer' }} className='navLink__container button-cotainer'>
                    <SearchOutlinedIcon style={{ fontSize: '23px' }} />

                </div>
                <Dialog fullWidth='md' open={open} onClose={handleClose}>
                    <DialogTitle >Search</DialogTitle>
                    <DialogContent>

                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Enter food name"
                            type="search"
                            fullWidth={true}
                            variant="standard"
                            value={searchFood}
                            onChange={(e) => setSearchFood(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleClose}>Cancel</Button>
                        <Button
                        >Search</Button>
                    </DialogActions>
                </Dialog>

            </div>


        </div>
    )
}

export default Header