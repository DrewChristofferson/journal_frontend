import Input from './Input'

export default {
    title: 'Input',
    component: Input,
}

export const Large = () => <Input style={{width: '80%'}}/>
export const Small = () => <Input style={{width: '20%'}} />
export const Medium = () => <Input style={{width: '50%'}}/>