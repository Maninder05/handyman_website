"use client";

import Link from "next/link";
import Image from "next/image";

export default function CreateService() {

  // when we click the Submit button
  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // stop the page from reloading

    // grab the form and all the values inside it
    const form = e.currentTarget;
    const formData = new FormData(form);

    const title = formData.get("title")?.toString().trim();
    const category = formData.get("category")?.toString();
    const price = formData.get("price")?.toString().trim();
    const image = formData.get("image");

    // find the message area
    const msgBox = document.getElementById("msg");
    if (!msgBox) return;

    // check if everything is filled in and an image is chosen
    if (title && category && price && image instanceof File) {
      msgBox.textContent = "Service Submitted Successfully ✅";

      // empty the form so user can type again
      form.reset();

      // hide the image preview again
      const preview = document.getElementById("imagePreview");
      if (preview) {
        preview.classList.add("hidden");
      }

    } else {
      // if something is missing show this
      msgBox.textContent = "Please fill in all fields and upload an image.";
    }

    // always show the message box
    msgBox.classList.remove("hidden");
  }

  // when we click Save as Draft
  function handleSaveDraft() {
    const msgBox = document.getElementById("msg");
    if (!msgBox) return;
    msgBox.textContent = "Draft Saved Successfully 📝";
    msgBox.classList.remove("hidden");
  }

  // when we choose a picture file
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    const preview = document.getElementById("imagePreview") as HTMLImageElement | null;

    if (file && preview) {
      // show the chosen image in the preview box
      preview.src = URL.createObjectURL(file);
      preview.classList.remove("hidden");
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-100">

      {/* top header */}
      <header className="bg-cyan-500 p-4 shadow-md flex items-center justify-center relative">
        <Link href="/h-portfolio" className="absolute left-4 top-4">
          ←
        </Link>
        <h1 className="text-2xl font-bold text-black">Create Service</h1>
      </header>

      {/* form area */}
      <main className="flex-1 p-5 bg-cyan-100 text-black">
        <form id="serviceForm" onSubmit={handleFormSubmit} className="space-y-6">

          <div>
            <label className="font-semibold">Service Title</label>
            <input
              name="title"
              type="text"
              placeholder="Enter service title"
              className="block w-full rounded p-2 border border-gray-300 mt-1"
            />
          </div>

          <div>
            <label className="font-semibold">Category</label>
            <select
              name="category"
              className="block w-full rounded p-2 border border-gray-300 mt-1"
            >
              <option value="">Select Category</option>
              <option>Electrical Repair</option>
              <option>Plumbing</option>
              <option>HVAC</option>
              <option>Carpentry</option>
            </select>
          </div>

          <div>
            <label className="font-semibold">Image</label>
            <input
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full rounded p-2 border border-gray-300 mt-1"
            />
            <Image
              id="imagePreview"
              src=""
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded hidden"
            />
          </div>

          <div>
            <label className="font-semibold">Price</label>
            <div className="flex space-x-3 mt-1">
              <select
                name="priceType"
                className="rounded p-2 border border-gray-300"
                defaultValue="Hourly"
              >
                <option>Hourly</option>
                <option>Fixed</option>
              </select>
              <input
                name="price"
                type="number"
                placeholder="Enter price"
                className="flex-1 rounded p-2 border border-gray-300"
              />
            </div>
          </div>

          {/* message text shows here */}
          <p id="msg" className="hidden text-center text-green-700 font-semibold"></p>
        </form>
      </main>

      {/* bottom footer buttons */}
      <footer className="bg-gray-200 p-4 mt-auto flex justify-around">
        <button
          type="button"
          onClick={handleSaveDraft}
          className="bg-gray-500 text-white px-6 py-2 rounded"
        >
          Save As Draft
        </button>
        <button
          form="serviceForm"
          type="submit"
          className="bg-cyan-500 text-white px-6 py-2 rounded"
        >
          Submit Now →
        </button>
      </footer>
    </div>
  );
}
