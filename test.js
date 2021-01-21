const firebaseTesting = require('@firebase/rules-unit-testing');

class Country {
  name;
  ref;

  constructor(name, ref) {
    this.name = name;
    this.ref = ref;
  }
}

const firestoreDataConverter = {
  toFirestore: (country) => ({ name: country.name }),
  fromFirestore: (snapshot) => {
    const data = snapshot.data();
    return new Country(data.name, snapshot.ref);
  },
}

describe('onsnapshot-withconverter', () => {
  let firebaseApp;

  beforeEach(() => {
    firebaseApp = firebaseTesting.initializeTestApp({
      projectId: 'test',
      auth: { uid: 'uid', email: "user@example.com" },
    });
    firebaseApp.firestore().useEmulator('localhost', 8000);
  });

  beforeEach(async () => {
    await firebaseApp
      .firestore()
      .collection('countries')
      .doc()
      .set({ name: 'Australia' });
  });

  afterEach(async () => {
    await firebaseTesting.clearFirestoreData({ projectId: 'test' });
  });

  afterEach(async () => {
    await firebaseApp.delete();
  });

  it('gets subcollection ref when using withConverter', (done) => {
    firebaseApp
      .firestore()
      .collection('countries')
      .withConverter(firestoreDataConverter)
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((docChange) => {
          const country = docChange.doc.data();
          expect(() => country.ref.collection('cities')).not.toThrow();
          done();
        });
      });
  });

  it('gets subcollection ref when not using withConverter', (done) => {
    firebaseApp
      .firestore()
      .collection('countries')
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((docChange) => {
          const country = firestoreDataConverter.fromFirestore(docChange.doc);
          expect(() => country.ref.collection('cities')).not.toThrow();
          done();
        });
      });
  });
});
