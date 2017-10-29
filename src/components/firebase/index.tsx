import Vue, {CreateElement, VNode} from 'vue';
import Component from 'vue-class-component';
import * as firebase from 'firebase/app';

interface FirebaseConfig {
  apiKey: string;
  projectId?: string;
  authDomain?: string;
  databaseURL?: string;
  storageBucket?: string;
  messagingSenderId?: string;
}

@Component({
  props: {
    apiKey: {
      type: String,
      required: true,
    },
    projectId: {
      type: String,
    },
    authDomain: {
      type: String,
    },
    databaseURL: {
      type: String,
    },
    storageBucket: {
      type: String,
    },
    messagingSenderId: {
      type: String,
    },
  },
})
export class Firebase extends Vue {
  inited: boolean = false;
  apiKey: string;
  projectId?: string;
  authDomain?: string;
  databaseURL?: string;
  storageBucket?: string;
  messagingSenderId: string;

  async mounted(): Promise<void> {
    const config: FirebaseConfig = {
      apiKey: this.apiKey,
    };
    if (this.projectId !== undefined) {
      config.projectId = this.projectId;
      await import('firebase/firestore');
    }
    if (this.authDomain !== undefined) {
      config.authDomain = this.authDomain;
      await import('firebase/auth');
    }
    if (this.databaseURL !== undefined) {
      config.databaseURL = this.databaseURL;
      await import('firebase/database');
    }
    if (this.storageBucket !== undefined) {
      config.storageBucket = this.storageBucket;
      await import('firebase/storage');
    }
    if (this.messagingSenderId !== undefined) {
      config.messagingSenderId = this.messagingSenderId;
      await import('firebase/messaging');
    }
    firebase.initializeApp(config);
    this.inited = true;
  }

  public render(h: CreateElement): VNode {
    if (this.inited) {
      return <div class="firebase">{this.$slots.default}</div>;
    }

    return <div class="firebase" />;
  }
}
