// 1.- librerias

// 2.- componentes

// 3.- estilos
import { ContainerStep, Step, Line } from '../styled';

// 4.- iconos
import { GiCardboardBox, GiHandTruck } from "react-icons/gi";
import { FaWpforms, FaTruck } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";

// 5.- hooks
import { useWindowDimensions } from '../../../hooks/windowDimensions/useWindowDimensions';

const WizardPage = (): JSX.Element => {

    const { width } = useWindowDimensions();

    return <div className={`d-flex my-5 w-100 row ${width <= 375 ? 'pl-4' : ''}`}>
        { width <= 375 ? null : <div className='col-1'></div> }

        <ContainerStep>
            <Step color='#D4E3FE'>
                <GiCardboardBox size={width <= 321 ? 20 : 30} />
            </Step>
        </ContainerStep>

        <ContainerStep>
            <Line color='#D4E3FE' />

            <Step color='#bdbdbd'>
                <FaWpforms size={width <= 321 ? 20 : 30} />
            </Step>
        </ContainerStep>

        <ContainerStep>
            <Line color='#bdbdbd' />
            
            <Step color='#bdbdbd'>
                <FaTruck size={width <= 321 ? 20 : 30} />
            </Step>
        </ContainerStep>

        <ContainerStep>
            <Line color='#bdbdbd' />
            
            <Step color='#bdbdbd'>
                <GiHandTruck size={width <= 321 ? 20 : 30} />
            </Step>
        </ContainerStep>

        <ContainerStep>
            <Line color='#bdbdbd' />
            
            <Step color='#bdbdbd'>
                <FaTruck size={width <= 321 ? 15 : 20} />
                <AiFillHome size={width <= 321 ? 15 : 20} />
            </Step>
        </ContainerStep>
    </div>
}

export default WizardPage;