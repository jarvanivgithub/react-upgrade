import { createFromIconFont } from "./Icon/createFrontIconfont";
import { IconAdd } from "./Icon/icons/IconAdd";
import { IconEmail } from "./Icon/icons/IconEmail";

const IconFont = createFromIconFont('//at.alicdn.com/t/c/font_4555964_wze8atgg61.js');

function App() {
  return (
    <div style={ {padding: '50px'} }>
      <IconAdd size='40px'></IconAdd>
      <IconEmail spin></IconEmail>
      <IconEmail style={{color: 'blue', fontSize: '50px'}}></IconEmail>
      <IconFont type="icon-RectangleCopy" size="40px" />
      <IconFont type="icon-RectangleCopy1" size="40px" />
      <IconFont type="icon-RectangleCopy2" fill="blue" size="40px" />
      <IconFont type="icon-RectangleCopy3" fill="blue" size="40px" />
    </div>
  );
}

export default App;
