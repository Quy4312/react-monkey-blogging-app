import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
import slugify from "slugify";
const PostNewestLargeStyles = styled.div`
  .post {
    &-image {
      display: block;
      margin-bottom: 20px;
      height: 433px;
      border-radius: 16px;
    }
    &-category {
      margin-bottom: 10px;
    }
    &-title {
      margin-bottom: 20px;
    }
    @media screen and (max-width: 1023.98px) {
      &-image {
        height: 250px;
      }
    }
  }
`;

const PostNewestLarge = ({ data }) => {
  const date = data?.createdAt?.seconds
    ? new Date(data?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  if (!data.id) return null;
  return (
    <PostNewestLargeStyles>
      <PostImage url={data?.image} alt="" to={data?.slug}></PostImage>

      <PostCategory to={data?.category.slug}>
        {data?.category?.name}
      </PostCategory>
      <PostTitle to={data?.slug} size="big">
        {data?.title}
      </PostTitle>
      <PostMeta
        to={slugify(data.user?.username || "", { lower: true })}
        authorName={data.user?.username}
        date={formatDate}
      ></PostMeta>
    </PostNewestLargeStyles>
  );
};

export default PostNewestLarge;
