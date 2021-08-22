<template>
  <Page>
    <ActionBar>
      <GridLayout class="fa-lg" width="100%" columns="auto, *" @tap="$refs.drawer.nativeView.toggleDrawerState()">
        <Label class="fa" verticalAlignment="center" :text="'fa-bars' | fonticon" col="0"/>
        <Label class="title" :text="currentPage.displayName"  col="1"/>
      </GridLayout>
    </ActionBar>

    <RadSideDrawer ref="drawer">
      <ScrollView ~drawerContent class="sidedrawer-left">
        <StackLayout>
          <Image src="~/assets/images/nhd-ga-logo.png" width="25%" class="m-t-10" />

          <StackLayout v-for="(page, i) in routes"
                      :key="i"
                      orientation="horizontal"
                      @tap="goToPage(page)"
                      class="fa-lg item-border">
            <Label class="drawer-item fa fa-lg" :text="page.icon | fonticon" />
            <Label :text="page.displayName" verticalAlignment="center" />
          </StackLayout>

          <StackLayout orientation="horizontal" horizontalAlignment="center" class="m-t-30">
            <Image src="~/assets/images/facebook-logo.png" width="20%" class="m-20" @tap="launchFacebook()" />
            <Image src="~/assets/images/twitter-logo.png" width="20%" class="m-20" @tap="launchTwitter()" />
            <Image src="~/assets/images/instagram-logo.png" width="20%" class="m-20" @tap="launchInstagram()" />
          </StackLayout>
        </StackLayout>
      </ScrollView>

      <Frame id="mainContent" ~mainContent>
        <Home />
      </Frame>
    </RadSideDrawer>
  </Page>
</template>

<script>
  import routes from '~/router'
  import Home from '~/pages/Home'
  import { firebase } from '@nativescript/firebase'
  import * as utilsModule from '@nativescript/core/utils/utils'
  import * as email from '@nativescript/email'

  export default {
    components: {
      Home
    },

    data() {
      return {
        routes,
        currentPage: routes.Home
      }
    },

    computed: {
      getCurrentPage () {
        return this.currentPage
      }
    },

    methods: {
      goToPage (pageComponent) {
        console.log(`goToPage: ${pageComponent.name}`)
        this.logEvent(pageComponent.name)

        if (pageComponent.name !== 'ContactUs') {
          this.currentPage = pageComponent
          this.$navigateTo(pageComponent, { frame: "mainContent" })
        } else {
          this.sendEmail()
        }

        this.$refs.drawer.nativeView.closeDrawer()
      },

      sendEmail () {
        email.compose({
          subject: 'NHD Georgia Native App Feedback',
          body: '',
          to: ['nhdhistory@lagrange.edu'],
          cc: [],
          bcc: []
        })
      },

      launchTwitter () {
        this.logEvent('Twitter')
        utilsModule.openUrl('https://twitter.com/NHDGeorgia')
      },

      launchFacebook () {
        this.logEvent('Facebook')
        utilsModule.openUrl('https://www.facebook.com/NHDatLaGrangeCollege')
      },

      launchInstagram () {
        this.logEvent('Instagram')
        utilsModule.openUrl('https://www.instagram.com/nhdgeorgia')
      },

      handleUpdateCurrentPage: function (e) {
        console.log(`handleUpdateCurrentPage: ${e.name}`)
        this.logEvent(e.name)
      },

      logEvent: function (key) {
        firebase.analytics.logEvent({ key: `${key}_tapped` }).then(
          function () {
            console.log("Firebase Analytics event logged");
          }
        )
      }
    }
  }
</script>

<style lang="scss" scoped>
  ActionBar GridLayout Label {
    color: #ffffff;
  }

  .fa-lg {
    font-size: 20em;
  }

  .title {
      text-align: left;
      padding-left: 16;
  }

  .message {
      vertical-align: center;
      text-align: center;
      font-size: 20;
      color: #333333;
  }

  .drawer-header {
      padding: 50 16 16 16;
      margin-bottom: 16;
      background-color: #CB2C30;
      color: #ffffff;
      font-size: 24;
  }

  .drawer-item {
    padding: 16 16;
    color: #333333;
    width: 60em;

    @at-root .ns-dark & {
      color: #ffffff;
    }
  }

  .item-border {
    border-bottom-color: black;
    border-bottom-width: 1px;
  }
</style>
