import PropTypes from 'prop-types'
import React, { Component } from 'react'
import logo from '../../../assessts/download.png'
import {
  Button,
  Container,
  Image,
  Menu,
  Responsive,
  Segment,
  Visibility,
} from 'semantic-ui-react'
import HomepageHeading from '../../../containers/home/homeHeading/HomeHeading';
import getWidth from '../getWidth';



class DesktopContainer extends Component {
    state = {}
  
    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })
  
    render() {
      const { children } = this.props
      const { fixed } = this.state
  
      return (
        <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
          <Visibility
            once={false}
            onBottomPassed={this.showFixedMenu}
            onBottomPassedReverse={this.hideFixedMenu}
          >
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 700, padding: '1em 0em',backgroundColor:"white"}}
              vertical
              
            >
              <Menu
                fixed={fixed ? 'top' : null}
                inverted={!fixed}
                pointing={!fixed}
                secondary={!fixed}
                size='large'
                style={{backgroundColor:"#007bff",marginTop:-14,minHeight:70}}
              >
                <Container style={{paddingBottom:20}}>
                  <Menu.Item>
                          <div>
                              <Image style={{marginTop:15}} verticalAlign="bottom" src={logo} alt="logo" />
                          </div>
                  </Menu.Item>
                  <Menu.Item className="textStyle" style={{marginLeft:40 ,paddingBottom:22}} as='a' >
                    Home
                  </Menu.Item>
                  <Menu.Item className="textStyle"  as='a' text style={{paddingBottom:22}}>Work</Menu.Item>
                  <Menu.Item className="textStyle" as='a' style={{paddingBottom:22}}>Company</Menu.Item>
                  <Menu.Item className="textStyle" as='a' style={{paddingBottom:22}}>Careers</Menu.Item>
                  <Menu.Item position='right'>
                    <Button as='h4' inverted={!fixed}>
                      Log in
                    </Button>
                    <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                      Sign Up
                    </Button>
                  </Menu.Item>
                </Container>
              </Menu>
              <HomepageHeading />
            </Segment>
          </Visibility>
  
          {children}
        </Responsive>
      )
    }
  }
  
  DesktopContainer.propTypes = {
    children: PropTypes.node,
  }

  export default DesktopContainer;