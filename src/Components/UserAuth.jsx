import { connect } from 'react-redux';
import React from 'react';
import Axios from 'axios';
import { 
    Button, 
    Input,
    IconSettings,
    Modal,
    Tabs,
    TabsPanel,
} from '@salesforce/design-system-react';

function useToggle(initialValue = false) {
    const [value, setValue] = React.useState(initialValue);
  
    const toggle = React.useCallback(() => {
      setValue(v => !v);
    }, []);
  
    return [value, toggle];
}
  

const UserAuth = (props) => { 
    const [isOpen, toggleIsOpen] = useToggle();

    // Sign In Variables
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    // Create Account Variables
    const [createName, setCreateName] = React.useState('');
    const [createEmail, setCreateEmail] = React.useState('');
    const [createPassword, setCreatePassword] = React.useState('');
    const [createConfirmPassword, setCreateConfirmPassword] = React.useState('');

    const signIn = (email, password) => {
        try {

        } catch (err) {
            console.error(err);
        }
    };

    const createAccount = async (name, email, password, confirmPassword) => {
        try {
            let result = await Axios.post('/api/salesforce/user', {
                name: name,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
            });

            console.log(result);

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <IconSettings iconPath="/assets/icons">
            <div><Button label="Sign In" onClick={toggleIsOpen} /></div>
            <Modal
                isOpen={isOpen}
                onRequestClose={toggleIsOpen}
            >
                <Tabs variant="scoped" id="tabs-example-scoped">
					<TabsPanel label="Sign In">
                        <div className="slds-p-horizontal_medium">
                            <div className="slds-p-vertical_small">
                                <Input
                                    label="Enter Email"
                                    assistiveText={{ label: 'Email' }}
                                    placeholder="example@gmail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="slds-p-vertical_small">
                                <Input
                                    label="Enter Password"
                                    assistiveText={{ label: 'Password' }}
                                    placeholder=""
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="slds-p-vertical_small slds-align_absolute-center">
                                <Button 
                                    label="Sign In" 
                                    className="slds-p-horizontal_xx-large"
                                    style={{ borderRadius: '0', backgroundColor: 'rgb(0, 206, 184)', color: '#fff'}}
                                />
                            </div>
                        </div>
                    </TabsPanel>
					<TabsPanel label="Create Account">
                        <div className="slds-p-horizontal_medium">
                            <div className="slds-p-vertical_small">
                                <Input
                                    label="Enter Name"
                                    assistiveText={{ label: 'Name' }}
                                    placeholder="Joe Buck"
                                    value={createName}
                                    onChange={(e) => setCreateName(e.target.value)}
                                />
                            </div>
                            <div className="slds-p-vertical_small">
                                <Input
                                    label="Enter Email"
                                    assistiveText={{ label: 'Email' }}
                                    placeholder="example@gmail.com"
                                    value={createEmail}
                                    onChange={(e) => setCreateEmail(e.target.value)}
                                />
                            </div>
                            <div className="slds-p-vertical_small">
                                <Input
                                    label="Enter Password"
                                    assistiveText={{ label: 'Password' }}
                                    placeholder=""
                                    value={createPassword}
                                    onChange={(e) => setCreatePassword(e.target.value)}
                                />
                            </div>
                            <div className="slds-p-vertical_small">
                                <Input
                                    label="Confirm Password"
                                    assistiveText={{ label: 'Confirm Password' }}
                                    placeholder=""
                                    value={createConfirmPassword}
                                    onChange={(e) => setCreateConfirmPassword(e.target.value)}
                                />
                            </div>
                            <div className="slds-p-vertical_small slds-align_absolute-center">
                                <Button 
                                    label="Create Account" 
                                    className="slds-p-horizontal_xx-large"
                                    style={{ borderRadius: '0', backgroundColor: 'rgb(0, 206, 184)', color: '#fff'}}
                                    onClick={() => createAccount(createName, createEmail, createPassword, createConfirmPassword)}
                                />
                            </div>
                        </div>
                    </TabsPanel>
				</Tabs>
            </Modal>
        </IconSettings>
    );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(UserAuth);