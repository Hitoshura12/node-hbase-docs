import React, {Component} from 'react'
import Modal from 'react-modal'
import {css} from 'glamor'

class Drawer extends Component {
  styles = {
    body: {
      width: '100%',
      overflowY: 'hidden',
    },
    main: {
      position: 'relative',
      margin: 0,
      paddingLeft: 250,
      backgroundColor: "#F2F2F2",
      '@media (max-width: 960px)': {
        paddingLeft: 0,
      },
    },
    mainClose: {
      paddingLeft: 0,
      left: 0,
    },
    mainOpen: {
      '@media (min-width: 960px)': {
        paddingLeft: '250px',
        transition: 'padding-left 225ms cubic-bezier(0.0, 0, 0.2, 1)',
      },
      '@media (max-width: 960px)': {
        left: '250px',
        transition: 'left 225ms cubic-bezier(0.0, 0, 0.2, 1)',
      },
    },
    drawer: {
      position: 'fixed',
      top: 0,
      height: '100vh',
      left: 0,
      width: '250px',
      overflow: 'auto',
      '> *': {
        overflow: 'auto',
      },
      '@media (max-width: 960px)': {
        left: '-250px',
      },
    },
    drawerClose: {
      left: '-250px',
    },
    drawerOpen: {
      left: 0,
      transition: 'left 225ms cubic-bezier(0.0, 0, 0.2, 1)',
      '.ReactModal__Content--after-open': {
        left: 0,
        transition: 'left 225ms cubic-bezier(0.0, 0, 0.2, 1)',
      }
    },
    drawerOpenModal: {
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, .6)',
    }
  }
  constructor(props) {
    super(props)
    this.state = { isMobile: false }
    this.main = React.createRef()
  }
  componentDidMount(){
      if(window.innerWidth < this.props.breakpoint){
      this.setState({ isMobile: true })
    }
  }
  render() {
    const { drawer, main, open } = this.props
    const {isMobile} = this.state
    const DrawerProps = drawer
    const MainProps = main
    const isWindow = typeof window !== `undefined`
    return (
      <div>
        <main ref={this.main} css={[this.styles.main, isWindow && open && this.styles.mainOpen, isWindow && !open && this.styles.mainClose]}>
          <MainProps />
        </main>
        { (isWindow && isMobile) ?
          <Modal
            isOpen={ open }
            onRequestClose={ this.props.onClickModal }
            aria={{labelledby: "Menu", describedby: "Navigate through the site"}}
            appElement={this.main.current}
            className={css([this.styles.drawer, isWindow && open && this.styles.drawerOpen, isWindow && !open && this.styles.drawerClose]).toString()}
            overlayClassName={css(this.styles.overlay).toString()}
            bodyOpenClassName={css(this.styles.body).toString()}
          >
            <DrawerProps />
          </Modal>
          :
          <div
            css={[this.styles.drawer, isWindow && open && this.styles.drawerOpen, isWindow && !open && this.styles.drawerClose]}
          >
            <DrawerProps />
          </div>
        }
      </div>
    )
  }
}

export default Drawer
