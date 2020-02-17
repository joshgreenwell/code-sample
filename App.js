import React, { useState, useEffect } from 'react'
import { css } from 'emotion'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Cookies from 'js-cookie'

import Section from './components/section'
import Donation from './components/donation'
import ContactComponent, {
  contactStyleOverride
} from './components/sections/contact'
import ActionComponent, {
  actionStyleOverride
} from './components/sections/action'
import FutureComponent from './components/sections/future-features'
import FeatureComponent from './components/sections/features'
import AboutComponent from './components/sections/about'
import HeaderComponent from './components/sections/header'
import Footer from './components/footer'

const container = css`
  display: flex;
  flex-direction: column;

  font-family: 'Poppins', sans-serif;
  color: #2f4858;
`

const content = {
  header: {
    title: 'Balance your life and mind.',
    subTitle: 'Manage your mental health and addiction recovery with Balance.'
  },
  about: {
    title: 'Live Mindfully',
    subTitle:
      'Being mindful is all about being present in the moment, not about thinking of the past or the future. Many of us struggle to do this and Balance strives to help.'
  },
  features: {
    title: 'Features',
    subTitle:
      'Balance offers a range of features from those who like to journal to those who like to see stats and streaks, and more!'
  },
  future: {
    title: 'Future Features',
    subTitle: 'Get a sneak peak at upcoming product feature releases.'
  },
  action: {
    title: 'Try Balance For Free',
    subTitle:
      'Download the Balance app and start your mental health and recovery journey today.'
  },
  contact: {
    title: 'Interested In Learning More?',
    subTitle: 'Get in touch, we’d love to hear from you!'
  },
  footer: {
    copyright: '©2019 The Mindful Pug LLC. All rights reserved.'
  }
}

const App = () => {
  const { header, about, features, future, action, contact, footer } = content

  // https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
  const mobilecheck = () => {
    let check = false
    ;(function(a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a
        ) ||
        // eslint-disable-next-line
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true
    })(navigator.userAgent || navigator.vendor || window.opera)
    return check
  }
  const isMobile = mobilecheck()

  const [showDonation, setShowDonation] = useState(true)
  const closeDonation = () => {
    Cookies.set('donation-suppression', 'true', { expires: 7 })
    setShowDonation(false)
  }

  useEffect(() => {
    const shouldShow = !Cookies.get('donation-suppression')
    setShowDonation(shouldShow)
  }, [])

  return (
    <Router>
      <div className={container}>
        <Switch>
          <Route path='/support'>
              <Section
                background="#F9F9F9"
                content={{
                  title: 'Need help?',
                  subTitle: 'If you have any questions please contact us.'
                }}
                component={<ContactComponent />}
                styleOverride={contactStyleOverride}
              />
              <div style={{ width: '100%', position: 'absolute', bottom: 0 }}>
                <Footer content={footer} />
              </div>
          </Route>
          <Route exact path='/privacy'>
            <Section content={{
              title: 'Privacy Policy',
              subTitle: 'Balance and any involved parties will not share any data received or collect any data irrelevant to the app, Balance.'
            }} />
            <div style={{ width: '100%', position: 'absolute', bottom: 0 }}>
              <Footer content={footer} />
            </div>
          </Route>
          <Route exact path='/'>
              {showDonation && <Donation closeDonation={closeDonation} />}
              <Section
                background="linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(193, 249, 241, 0.4) 70.7%, rgba(171, 248, 236, 0.4) 100%)"
                override={<HeaderComponent content={header} isMobile={isMobile} />}
              />
              <Section content={about} component={<AboutComponent />} />
              <Section
                background="#F9F9F9"
                component={<FeatureComponent isMobile={isMobile} />}
                content={features}
              />
              <Section content={future} component={<FutureComponent />} />
              <Section
                background="#00B49C"
                override={<ActionComponent content={action} />}
                styleOverride={actionStyleOverride}
              />
              <Section
                background="#F9F9F9"
                content={contact}
                component={<ContactComponent />}
                styleOverride={contactStyleOverride}
              />
              <Footer content={footer} />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
