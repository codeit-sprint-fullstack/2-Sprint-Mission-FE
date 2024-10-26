import Head from "next/head";
// import styles from "@/styles/Post.module.css";
import { getArticle } from "../../lib/api";
import { useEffect, useState } from "react";
import axios from "../../lib/axios";

export async function getServerSideProps(context) {
  const { id } = context.query;

  try {
    const post = await getArticle(id);
    return {
      props: {
        post,
      },
    };
  } catch {
    return { notFound: true };
  }
}

export default function PostDetail({ post }) {
  return (
    <>
      <title>{post.title}</title>
      <div>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
      </div>
    </>
  );
}
