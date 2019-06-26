import React,{ Component } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink, Container
 } from 'reactstrap';

class NavBar extends Component{
    constructor(props){
        super(props)

        this.state = {
            isOpen:false
        }
    }


    toggle = ()=>{
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render(){
        return(
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">ShoppingList</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="https://github.com/mahbubevan" target="_blank">
                                        GitHub
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="https://www.mahbubalamevan.me" target="_blank">
                                        Portfolio
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}

export default NavBar