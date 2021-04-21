import LoginInput from './LoginInput'

export default {
    title: 'LoginInput',
    component: LoginInput,
}

export const Large = () => <LoginInput style={{width: '80%'}}/>
export const Small = () => <LoginInput style={{width: '20%'}} />
export const Medium = () => <LoginInput style={{width: '50%'}}/>