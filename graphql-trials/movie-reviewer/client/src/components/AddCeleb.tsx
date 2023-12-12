import CelebForm from "./CelebForm";
import { FaPlus } from "react-icons/fa";
import { gql, useMutation } from "@apollo/client";
import { celebQuery } from "@/graphqlSchemas";


const addCelebMutationGQL = gql`
    mutation AddCelebrity($data: CelebInput!) {
        addCelebrity(data: $data) {
            _id
        }
    }
`

export default function AddCeleb() {

    const [addCelebFN, { reset }] = useMutation(addCelebMutationGQL, {
        refetchQueries: [
            celebQuery
        ]
    });

    const onSubmit = async (values: celebFormData) => {
        reset()
        await addCelebFN({ variables: { data: values } })
    }

    return (
        <CelebForm submitFN={onSubmit} buttonTrigger={<><FaPlus /> <span>Add Celeb</span></>} formTitle="Add Celeb" />
    )
}