import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPen,
  faEye,
  faTrash,
  faEyeSlash,
  faChevronLeft,
  faChevronRight,
  faChevronDown,
  faChevronUp,
  faRightFromBracket
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const icons = {
  faPen,
  faEye,
  faTrash,
  faEyeSlash,
  faChevronLeft,
  faChevronRight,
  faChevronDown,
  faChevronUp,
  faRightFromBracket
};

library.add(icons);


export { icons };

export default FontAwesomeIcon;