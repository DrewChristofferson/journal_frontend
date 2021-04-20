import LoginInput from './Input'

export default {
    title: 'Input',
    component: LoginInput,
}

export const Large = () => <LoginInput />
export const Small = () => <LoginInput style={{width: '50px'}} />
export const Medium = () => <LoginInput />