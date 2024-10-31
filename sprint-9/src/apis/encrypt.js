const pad = (str0, max) => {
	const str = str0.toString();
	return str.length < max ? pad(`0${str}`, max) : str;
};
const hash1 = str => {
	let h = -17 - str.length;
	for (let i = 0; i < str.length; i += 1) {
		h += str.charCodeAt(i);
		h += h << 10;
		h ^= h >>> 6;
	}
	h += (h >>> 0) % 1318489 << 7;
	h += h << 3;
	h ^= h >>> 11;
	h += h << 15;
	h >>>= 0;
	return pad(h.toString(16), 8);
};
const hash2 = str => {
	let h = str.length + 1;
	let tmp;
	for (let i = 0; i < str.length; i += 1) {
		h += str.charCodeAt(i);
		tmp = (str.charCodeAt(str.length - 1 - i) << 11) ^ h;
		h += (h << 16) ^ tmp;
		h ^= h >>> 7;
		h += h << 11;
	}
	h += (h >>> 0) % 918679 << 11;
	h ^= h << 3;
	h += h >>> 5;
	h ^= h << 4;
	h += h >>> 17;
	h ^= h << 25;
	h += h >>> 6;
	h >>>= 0;
	return pad(h.toString(16), 8);
};
const hash3 = str => {
	let h = -1023 + str.length;
	for (let i = 0; i < str.length; i += 1) {
		h ^= (h << 5) + (h >>> 2) + str.charCodeAt(i);
	}
	h ^= h << 15;
	h += h << 15;
	h += (h >>> 0) % 1299451 << 2;
	h >>>= 0;
	return pad(h.toString(16), 8);
};
const hash4 = str => {
	/* RS Hash Function */
	const b = 378551;
	let a = 63689;
	let h = 0;
	for (let i = 0; i < str.length; i += 1) {
		let q = 0;
		for (let j = 0; j < 32; j += 1) {
			if (a & (1 << j)) {
				q = (q + (h << j)) >>> 0;
			}
		}
		h = (q + str.charCodeAt(i)) >>> 0;
		// h=h*a+str.charCodeAt(i);
		q = 0;
		for (let j = 0; j < 32; j += 1) {
			if (b & (1 << j)) {
				q = (q + (a << j)) >>> 0;
			}
		}
		a = q;
		// a=a*b;
	}
	return pad(h.toString(16), 8);
};
const hash5 = str => {
	/* JS Hash Function */
	let h = 1315423911;
	for (let i = 0; i < str.length; i += 1) {
		h ^= ((h << 5) + str.charCodeAt(i) + (h >> 2)) >>> 0;
	}
	h >>>= 0;
	return pad(h.toString(16), 8);
};
const hash6 = str => {
	/* ELF Hash Function */
	let h = 0;
	let x = 0;
	for (let i = 0; i < str.length; i += 1) {
		h = ((h << 4) + str.charCodeAt(i)) >>> 0;
		if ((x = h & 0xf0000000) !== 0) {
			h ^= x >> 24;
		}
		h &= ~x;
	}
	h >>>= 0;
	return pad(h.toString(16), 8);
};
const hash7 = str => {
	/* BKDR Hash Function */
	const a = 131;
	// 31 131 1313 13131 131313 etc..
	let h = 0;
	for (let i = 0; i < str.length; i += 1) {
		let q = 0;
		for (let j = 0; j < 32; j += 1) {
			if (a & (1 << j)) {
				q = (q + (h << j)) >>> 0;
			}
		}
		h = (q + str.charCodeAt(i)) >>> 0;
		// h=h*a+str.charCodeAt(i);
	}
	return pad(h.toString(16), 8);
};
const hash8 = str => {
	/* SDBM Hash Function */
	let h = 0;
	for (let i = 0; i < str.length; i += 1) {
		h = (str.charCodeAt(i) + (h << 6) + (h << 16) - h) >>> 0;
	}
	return pad(h.toString(16), 8);
};
const hash9 = str => {
	/* DJB Hash Function */
	let h = 5381;
	for (let i = 0; i < str.length; i += 1) {
		h = ((h << 5) + h + str.charCodeAt(i)) >>> 0;
	}
	return pad(h.toString(16), 8);
};
const hash10 = str => {
	/* DEK Hash Function */
	let h = str.length;
	for (let i = 0; i < str.length; i += 1) {
		h = (h << 5) ^ (h >> 27) ^ str.charCodeAt(i);
	}
	h >>>= 0;
	return pad(h.toString(16), 8);
};
const hash11 = str => {
	/* BP Hash Function */
	let h = 0;
	for (let i = 0; i < str.length; i += 1) {
		h = (h << 7) ^ str.charCodeAt(i);
	}
	h >>>= 0;
	return pad(h.toString(16), 8);
};
const hash12 = str => {
	/* FNV Hash Function */
	const a = 0x811c9dc5;
	let h = 0;
	for (let i = 0; i < str.length; i += 1) {
		let q = 0;
		for (let j = 0; j < 32; j += 1) {
			if (a & (1 << j)) {
				q = (q + (h << j)) >>> 0;
			}
		}
		h = q >>> 0;
		// h=h*a;
		h ^= str.charCodeAt(i);
	}
	h >>>= 0;
	return pad(h.toString(16), 8);
};
const hash13 = str => {
	/* AP Hash Function */
	let h = 0xaaaaaaaa;
	for (let i = 0; i < str.length; i += 1) {
		if ((i & 1) === 0) {
			h ^= (h << 7) ^ (str.charCodeAt(i) * (h >> 3));
		} else {
			h ^= ~(((h << 11) + str.charCodeAt(i)) ^ (h >> 5));
		}
	}
	h >>>= 0;
	return pad(h.toString(16), 8);
};
const encrypt0 = (salt, h, iter) => {
	let i = 0;
	let h1 = h.substring(i, i + 8);
	i += 8;
	let h2 = h.substring(i, i + 8);
	i += 8;
	let h3 = h.substring(i, i + 8);
	i += 8;
	let h4 = h.substring(i, i + 8);
	i += 8;
	let h5 = h.substring(i, i + 8);
	i += 8;
	let h6 = h.substring(i, i + 8);
	i += 8;
	let h7 = h.substring(i, i + 8);
	i += 8;
	let h8 = h.substring(i, i + 8);
	i += 8;
	let h9 = h.substring(i, i + 8);
	i += 8;
	let h10 = h.substring(i, i + 8);
	i += 8;
	let h11 = h.substring(i, i + 8);
	i += 8;
	let h12 = h.substring(i, i + 8);
	i += 8;
	let h13 = h.substring(i, i + 8);
	for (let k = 0; k < iter; k += 1) {
		const tmp1 = h13 + h12 + h11 + h10 + h9 + salt + h8 + h7 + h6 + h5 + h4 + h3 + h2 + h1;
		const tmp2 = h1 + h3 + salt + h2;
		const tmp3 = salt + h2 + h8 + h1 + h3;
		const tmp4 = h7 + salt + h5;
		const tmp5 = h4 + salt + h8;
		const tmp6 = h10 + h13 + salt + h6;
		const tmp7 = h6 + h1 + h9 + salt;
		const tmp8 = h9 + salt + h10;
		const tmp9 = h7 + salt + h12;
		const tmp10 = h11 + salt + h5;
		const tmp11 = h4 + salt + h13 + h2;
		const tmp12 = h11 + salt + h6;
		const tmp13 = h4 + h12 + salt + h8;
		h1 = hash1(tmp1);
		h2 = hash2(tmp2);
		h3 = hash3(tmp3);
		h4 = hash4(tmp4);
		h5 = hash5(tmp5);
		h6 = hash6(tmp6);
		h7 = hash7(tmp7);
		h8 = hash8(tmp8);
		h9 = hash9(tmp9);
		h10 = hash10(tmp10);
		h11 = hash11(tmp11);
		h12 = hash12(tmp12);
		h13 = hash13(tmp13);
	}
	return h1 + h2 + h3 + h4 + h5 + h6 + h7 + h8 + h9 + h10 + h11 + h12 + h13;
};
const encrypt = (salt, pwd0, iter) => {
	const pwd = salt + pwd0;
	return encrypt0(
		salt,
		hash1(pwd) +
			hash2(pwd) +
			hash3(pwd) +
			hash4(pwd) +
			hash5(pwd) +
			hash6(pwd) +
			hash7(pwd) +
			hash8(pwd) +
			hash9(pwd) +
			hash10(pwd) +
			hash11(pwd) +
			hash12(pwd) +
			hash13(pwd),
		iter,
	);
};
export const encryptRest = (salt, pwd0, iter) => {
	return encrypt0(salt, pwd0, ITER_FULL - iter);
};
export const encryptSSNRest = (salt, pwd0, iter) => {
	return encrypt0(salt, pwd0, ITER_SSN_FULL - iter);
};
export function generateRandomHexString(length = 32) {
	const characters = '0123456789abcdef';
	let result = '';
	for (let i = 0; i < length; i += 1) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
}

export const ITER_FULL = 10000;
export const ITER_SSN_FULL = 1000;
export default encrypt;
