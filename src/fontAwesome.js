import Vue from "vue";
import {
  library
} from "@fortawesome/fontawesome-svg-core";
import {
  faHome,
  faExpandAlt,
  faWindowMinimize,
  faTimes,
  faWindowMaximize,
  faUnlock,
  faSearch,
  faHeart,
  faInbox,
  faInfoCircle,
  faDownload,
  faCog,
  faSortDown,
  faEye,
  faStar,
  faStarHalf,
  faMagnet,
  faCircle,
  faEyeSlash
} from "@fortawesome/free-solid-svg-icons";

import {
  faWindowRestore
} from "@fortawesome/free-regular-svg-icons";
import {
  FontAwesomeIcon
} from "@fortawesome/vue-fontawesome";

library.add(
  faHome,
  faExpandAlt,
  faWindowRestore,
  faWindowMaximize,
  faWindowMinimize,
  faTimes,
  faUnlock,
  faSearch,
  faHeart,
  faInbox,
  faInfoCircle,
  faDownload,
  faCog,
  faSortDown,
  faEye,
  faStar,
  faStarHalf, faMagnet,
  faCircle,
  faEyeSlash
);

Vue.component("font-awesome-icon", FontAwesomeIcon);