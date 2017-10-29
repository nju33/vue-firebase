import Vue, {CreateElement} from 'vue';
import Component from 'vue-class-component';
import {Firebase} from 'components/firebase';
import * as firebase from 'firebase/app';

@Component
class Main extends Vue {
  private async mounted() {
    const db = firebase.firestore();
    const snapshot = await db.collection('users').get();
    snapshot.docs.map(doc => console.log(doc.data()));
  }

  public render(h: CreateElement) {
    return <div>children</div>;
  }
}

new Vue({
  render(h: CreateElement) {
    return (
      <div>
        <Firebase
          apiKey="AIzaSyBnvDDDmniFTwB8-GC3VUlWWhpfVigZ3f0"
          projectId="nju333333"
          authDomain="nju333333.firebaseapp.com"
          // databaseURL="https://nju333333.firebaseio.com"
          // storageBucket="nju333333.appspot.com"
          // messagingSenderId="352622442128"
        >
          <Main />
        </Firebase>
      </div>
    );
  },
}).$mount('#app');
