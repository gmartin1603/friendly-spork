import React from 'react';
import { useAuthState } from '../../context/auth/AuthProvider';
import { button } from '../../context/style/style';
import FormInput from '../FormInput';

function BidForm() {

    const [{formObj, profile}, dispatch] = useAuthState()

    const closeForm = () => {
        dispatch(
            {
                type: "CLOSE-FORM",
                name: "showBid",        
            }
        )
    }

    const styles = {
        backDrop: ` h-full w-full fixed top-0 left-0 z-10 bg-clearBlack flex items-center justify-center `,
        form: ` text-todayGreen bg-white h-max w-max mt-.02 p-.02 rounded-xl flex-column `,
        closeBtn:`${button.redText} text-xl p-[5px]`,
        
    }
    return (
        <div className={styles.backDrop}>
            <form className={styles.form} action="Bid">
                <div className={` h-50 w-full flex justify-end mb-10`}>
                    <div 
                    className={styles.closeBtn}
                    onClick={() => closeForm()}>
                        <p>Close</p>
                    </div>
                </div>
                <FormInput
                value={`${formObj.title}`}
                disabled
                />
                <FormInput
                label="Posting Date:"
                value={`${new Date(formObj.post.date).toDateString()}`}
                disabled
                />
                <FormInput
                label="Posting Down:"
                value={`${new Date(formObj.post.down).toDateString()}`}
                disabled
                />
                <div>
                    
                </div>
            </form>
        </div>
    );
}

export default BidForm;