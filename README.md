# Issue Fix
This issue was fixed with the release of [Firebase JS SDK v8.2.4](https://firebase.google.com/support/release-notes/js#version_824_-_january_21_2021) and so this repository is now archived.

# Issue Reproduction
This repository is a minimal reproduction of a Firebase issue that occurs when `withConverter` is used with `onSnapshot`. The code that shows this issue is found in `test.js` and the issue can be reproduced by running the following command.

```bash
npm i && npm t
```

The Github issue can be found [here](https://github.com/firebase/firebase-js-sdk/issues/4309).
