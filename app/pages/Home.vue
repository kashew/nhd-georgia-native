<template>
  <Page actionBarHidden="true">
    <FlexboxLayout flexDirection="column">
      <StackLayout class="m-10" flexGrow="1">
        <ScrollView>
          <StackLayout class="m-10" flexGrow="1">
            <Image src="~/assets/images/nhd-ga-logo.png" width="35%" />
            <Label
              textWrap="true"
              class="m-t-20"
              text="Welcome to NHD Georgia. Our goal is to help you get the most out of your History Day Project. You are joining a global community of NHD scholars totaling more than half a million last year. So, welcome to the adventure that is National History Day!"
            />

            <Label text="Announcements" class="font-weight-bold m-t-20" />
            <StackLayout class="hr"></StackLayout>
            <StackLayout v-for="announcement in announcements" :key="announcement.id">
              <Label
                :text="announcement.description"
                class="m-b-10"
                textWrap="true"
                @tap="onAnnouncementTap(announcement.url)"
                :class="{ link: announcement.url }"
              />
              <StackLayout class="hr m-5"></StackLayout>
            </StackLayout>
          </StackLayout>
        </ScrollView>
      </StackLayout>

      <StackLayout orientation="horizontal" horizontalAlignment="center" height="100">
        <Image
          src="~/assets/images/ga-humanities-logo.png"
          @tap="openHumanities()"
          width="45%"
          class="m-x-5"
        />
        <Image
          src="~/assets/images/lagrange-college-logo.png"
          @tap="openCollege()"
          width="45%"
          class="m-x-10"
        />
      </StackLayout>
    </FlexboxLayout>
  </Page>
</template>

<script>
import * as utilsModule from "@nativescript/core/utils/utils";
import { firebase } from '@nativescript/firebase'

export default {
  name: "Home",
  displayName: "Home",
  icon: "fa-home",
  data() {
    return {
      announcements: []
    };
  },

  created: async function() {
    const collection = firebase.firestore.collection("announcements");

    const docs = await collection.get();
    docs.forEach(doc => {
      this.announcements.push(doc.data());
    });
  },

  methods: {
    openCollege: function() {
      utilsModule.openUrl("https://www.lagrange.edu/");
    },

    openHumanities: function() {
      utilsModule.openUrl("https://www.georgiahumanities.org/");
    },

    onAnnouncementTap: function(url) {
      if (url) utilsModule.openUrl(url);
    }
  }
};
</script>

<style lang="scss" scoped>
.link {
  color: blue;
  text-decoration: underline;

  @at-root .ns-dark & {
    color: #aaaaff;
  }
}
</style>