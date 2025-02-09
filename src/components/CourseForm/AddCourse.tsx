/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
import React, { useReducer } from "react";
import styled from "styled-components";
import { useCreateCourseMutation } from "../../graphql/generated/graphql";
import { courseFormReducer, initialState } from "./courseFormReducer";

const AddCourse = (): JSX.Element => {
  const [inputFields, setInputFields] = useReducer(
    courseFormReducer,
    initialState
  );
  const [createCourse] = useCreateCourseMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCourse({
        variables: {
          data: {
            title: inputFields.title,
            video: inputFields.video,
            categories: inputFields.categories,
            description: inputFields.description,
            link: Object.values(inputFields.doc),
          },
        },
      });
      setInputFields({
        type: "reset",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddField = () => {
    setInputFields({
      type: "addField",
      doc: {
        title: "",
        url: "",
        img: "",
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setInputFields({
      type: "addContent",
      [e.target.name]: e.target.value,
    });
  };

  const handleAddDoc = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setInputFields({
      type: "addDoc",
      index,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <NewCourse>
      {Object.values(inputFields?.doc || {})?.length <= 3 && (
        // eslint-disable-next-line react/button-has-type
        <button onClick={handleAddField} aria-hidden="true">
          AddField
        </button>
      )}
      <form onSubmit={handleSubmit}>
        <NewCourseForm>
          <Input>
            <label htmlFor="title">
              Titre :
              <input
                id="title"
                name="title"
                value={inputFields?.title}
                onChange={handleChange}
              />
            </label>
          </Input>
          <Input>
            <label htmlFor="video">
              Lien vidéo :
              <input
                id="video"
                name="video"
                value={inputFields?.video}
                onChange={handleChange}
              />
            </label>
          </Input>
          {Object.values(inputFields?.doc || {})?.map(
            (el, index: number): JSX.Element => (
              <div key={index}>
                <Input>
                  <label htmlFor="title-documentation">
                    Titre documentation {`${index + 1}`} :
                    <input
                      id="title-documentation"
                      name="title"
                      value={el?.title}
                      onChange={(event) => handleAddDoc(event, index)}
                    />
                  </label>
                </Input>
                <Input>
                  <label htmlFor="link-documentation">
                    Lien documentation {`${index + 1}`}:
                    <input
                      id="link-documentation"
                      name="url"
                      value={el?.url}
                      onChange={(event) => handleAddDoc(event, index)}
                    />
                  </label>
                </Input>
                <Input>
                  <label htmlFor="link-documentation">
                    Lien Image de la documentation {`${index + 1}`}:
                    <input
                      id="link-documentation"
                      name="img"
                      value={el?.img}
                      onChange={(event) => handleAddDoc(event, index)}
                    />
                  </label>
                </Input>
              </div>
            )
          )}
          <Input>
            <label htmlFor="categories">
              Catégorie :
              <input
                id="categories"
                name="categories"
                value={inputFields?.categories}
                onChange={handleChange}
              />
            </label>
          </Input>
          <Input>
            <label htmlFor="description">
              Description :
              <input
                id="description"
                name="description"
                value={inputFields?.description}
                onChange={handleChange}
              />
            </label>
          </Input>
          <div onClick={(e) => handleSubmit(e)} aria-hidden="true">
            Create course
          </div>
        </NewCourseForm>
      </form>
    </NewCourse>
  );
};
const NewCourse = styled.div`
  padding: 5px 0 20px;
  background-color: #474747;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  h2 {
    text-align: center;
    color: #cbddd1;
  }

  hr {
    width: 20%;
    color: #cbddd1;
  }
`;

const NewCourseForm = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export default AddCourse;
