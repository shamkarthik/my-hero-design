"use client";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import GithubIcon from "../public/github-icon.svg";
import LinkedinIcon from "../public/linkedin-icon.svg";
import KeywordListener from "./KeywordListener";
import { useAudioPlayer } from "./useAudioPlayer";

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  subject: HTMLInputElement;
  message: HTMLInputElement;
}

interface ContactFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}
const EmailSection = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const { play, audioRef, src } = useAudioPlayer({
    src: "static/im-batman.mp3",
  });

  const { toast } = useToast();
  const handleSubmit = async (e: FormEvent<ContactFormElement>) => {
    e.preventDefault();
    const data = {
      email: e.currentTarget.email.value,
      subject: e.currentTarget.subject.value,
      message: e.currentTarget.message.value,
    };
    const JSONdata = JSON.stringify(data);
    const endpoint = "/api/send";

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: "POST",
      // Tell the server we're sending JSON.
      headers: {
        "Content-Type": "application/json",
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);
    const resData = await response.json();

    if (response.status === 200) {
      console.log("Message sent.");
      setEmailSubmitted(true);
    }
  };

  const handleKeywordTyped = () => {
    console.log("event triggered");
    toast({
      title: "Welcome to Batcave",
      description: "I am Batman",
    });
    play();
  };

  return (
    <section id="contact" className="bg-yellow">
      <div className="grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4 relative">
        <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900 to-transparent rounded-full h-80 w-80 z-0 blur-lg absolute top-3/4 -left-4 transform -translate-x-1/2 -translate-1/2"></div>
        <div className="z-10">
          <h5 className="text-xl font-bold text-white my-2">
            Let`&apos;s Connect
          </h5>
          <p className="text-[#ADB7BE] mb-4 max-w-md">
            {" "}
            I&apos;m currently looking for new opportunities, my inbox is always
            open. Whether you have a question or just want to say hi, I&apos;ll
            try my best to get back to you!
          </p>
          <div className="socials flex flex-row gap-2">
            <Link href="github.com">
              <Image src={GithubIcon} alt="Github Icon" />
            </Link>
            <Link href="linkedin.com">
              <Image src={LinkedinIcon} alt="Linkedin Icon" />
            </Link>
          </div>
        </div>
      </div>
      <KeywordListener targetWord="asa" onKeywordTyped={handleKeywordTyped} />
      <audio ref={audioRef} src={src} />
    </section>
  );
};

export default EmailSection;
