import Link from 'next/link';


export default function Home() {
    return (
        <div>
            <h1>Welcome to our Website</h1>
            <Link href="/Signup">
                <button>회원가입하기</button>
            </Link>
        </div>
    );
}