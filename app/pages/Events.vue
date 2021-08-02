<template>
  <Page actionBarHidden="true">
    <ScrollView>
      <ListView for="(event, index) in events" @itemTap="onEventTap">
        <v-template>
          <StackLayout>
            <Label :text="event.title" class="h2 p-0" />
            <DockLayout stretchLastChild="false">
              <StackLayout dock="left" class="p-0">
                <Label :text="event.startDate | date" class="font-weight-bold p-0" />
                <Label :text="event.notes" class="p-0" />
              </StackLayout>
              <Image
                :src="getCalendarSrc(index)"
                style="width: 120px"
                dock="right"
                horizontalAlignment="right"
                :class="{ toggling: event.isAddedToCalendar }"
              />
            </DockLayout>
          </StackLayout>
        </v-template>
      </ListView>
    </ScrollView>
  </Page>
</template>

<script>
import * as utilsModule from "@nativescript/core/utils/utils";
import * as Calendar from "nativescript-calendar";
import { Toasty, ToastPosition } from "@triniwiz/nativescript-toasty";
import { firebase } from '@nativescript/firebase'

export default {
  name: "Events",
  displayName: "Events",
  icon: "fa-calendar",
  data() {
    return {
      toggleAnimationState: [],
      events: []
    };
  },

  filters: {
    date: function(value) {
      let options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      };

      return value.toLocaleDateString("en-US", options);
    }
  },

  props: ["currentPage"],

  created: async function() {
    const collection = firebase.firestore.collection("events");

    const docs = await collection.orderBy("startDate").get();
    const dateNow = new Date();
    docs.forEach(doc => {
      let data = doc.data();
      data.isAddedToCalendar = false;

      if (dateNow.getTime() < data.endDate.getTime()) this.events.push(data);
    });
  },

  methods: {
    onEventTap: async function(e) {
      // this.$emit('update-current-page', e.item.title)
      // utilsModule.openUrl(e.item.url)
      let options = {
        title: e.item.title,
        startDate: e.item.startDate,
        endDate: e.item.endDate,
        location: e.item.location,
        notes: e.item.notes,
        url: e.item.url,
        calendar: {
          name: "NHD Georgia Events",
          color: "#CB2C30",
          accountName: "NHD Georgia"
        }
      };

      try {
        let createdId = await Calendar.createEvent(options);
        console.log(`Created Event with ID: ${createdId}`);

        e.item.isAddedToCalendar = true;

        const toast = new Toasty({
          text: "Event Added to Calendar!",
          position: ToastPosition.CENTER,
          android: { yAxisOffset: 100 },
          ios: {
            displayShadow: true,
            cornerRadius: 24
          }
        });

        toast.show();
      } catch (e) {
        console.log("Error creating an Event: " + e);
      }
    },

    getCalendarSrc: function(idx) {
      let event = this.events[idx];

      return event.isAddedToCalendar
        ? "~/assets/images/calendar-check.png"
        : "~/assets/images/calendar-add.png";
    }
  }
};
</script>

<style lang="scss" scoped>
.toggling {
  animation-name: toggle;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;
}

@keyframes toggle {
  0% {
    transform: scale(1, 1);
  }

  30%,
  70% {
    transform: scale(0.8, 0.8);
  }

  50% {
    transform: scale(1.2, 1.2);
  }

  100% {
    transform: scale(1, 1);
  }
}
</style>
