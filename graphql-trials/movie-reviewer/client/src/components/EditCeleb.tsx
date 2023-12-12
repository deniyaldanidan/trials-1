import { gql, useMutation } from "@apollo/client";
import CelebForm from "./CelebForm";


const editCelebGQL = gql`
    mutation UpdateCelebrity($updateCelebrityId: ID!, $data: CelebUpdInp!) {
        updateCelebrity(id: $updateCelebrityId, data: $data) {
            _id
            bio
            name
            titles
        }
    }
`;

type props = {
    celebData: celebData
}

export default function EditCeleb({ celebData }: props) {
    const [editCeleb, { reset }] = useMutation(editCelebGQL);


    const submitFN = async (values: celebFormData) => {
        // Logic comes here
        reset();
        // console.log(values)
        await editCeleb({
            variables: {
                updateCelebrityId: celebData._id,
                data: values
            }
        })
    }

    return (
        <CelebForm formTitle="Edit Celeb" submitFN={submitFN} buttonTrigger="Edit" defaultValues={{ name: celebData.name, bio: celebData.bio, titles: celebData.titles }} />
    )
}