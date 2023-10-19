import { Bars } from  'react-loader-spinner'
import { LodeWrapper } from './Loader.styled';

export const Loader = () => {
  
return(
  <LodeWrapper>
    <Bars
  height="80"
  width="80"
  color="#00f2ff"
  ariaLabel="bars-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>
  </LodeWrapper>
)
}
