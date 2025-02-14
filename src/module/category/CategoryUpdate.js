import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Field, FieldCheckboxes } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import DashboardHeading from "drafts/DashboardHeading";
import { db } from "firebase-app/firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import slugify from "slugify";
import { categoryStatus } from "utils/constants";

const CategoryUpdate = () => {
  const {
    control,
    setValue,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {},
  });
  const navigate = useNavigate();
  const watchStatus = watch("status");
  const [params] = useSearchParams();
  const categoryId = params.get("id");
  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "categories", categoryId);
      const docSnap = await getDoc(docRef);
      reset(docSnap.data());
      console.log("🚀 ~ fetchData ~ docSnap:", docSnap.data());
    }
    fetchData();
  }, [categoryId, reset]);
  const handleUpdateCategory = async (values) => {
    const docRef = doc(db, "categories", categoryId);
    await updateDoc(docRef, {
      name: values.name,
      slug: slugify(values.slug || values.title, { lower: true }),
      status: Number(values.status),
    });
    toast.success("Update category successfully");
    navigate("/manage/category");
  };

  if (!categoryId) return null;
  return (
    <div>
      <DashboardHeading
        title="Update category"
        desc={`Update your category id:${categoryId}`}
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateCategory)} autoComplete="off">
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your slug"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.APPROVED}
                value={categoryStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.UNAPPROVED}
                value={categoryStatus.UNAPPROVED}
              >
                Unapproved
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          kind="primary"
          className="mx-auto w-[200px]"
          type="submit"
          disable={isSubmitting}
          isLoading={isSubmitting}
        >
          Update category
        </Button>
      </form>
    </div>
  );
};

export default CategoryUpdate;
