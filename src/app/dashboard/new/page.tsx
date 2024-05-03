"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod"; // Import Zod
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/ui/InputField";
import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

//Should be imported from the types file.
type Project = {
	title: string;
	description: string;
	category: string;
	co_authors: string;
	// todo use correct imagefield type assumption is that image is path to an image file
	image: string;
};

//Define the schema for the form
const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ProjectSchema = z
	.object({
		title: z.string().min(2).max(50),
		description: z.string().min(2),
		category: z.string().min(2).max(50),
		co_authors: z.string().min(2).max(50),
		image: typeof window === 'undefined' ? z.any() : z.instanceof(File)
			.optional()
			.refine((file) => {
				return !file || file.size <= MAX_UPLOAD_SIZE;
			}, 'File size must be less than 3MB')

		//image
	});

const ProjectPage = () => {
	const form = useForm<z.infer<typeof ProjectSchema>>({
		resolver: zodResolver(ProjectSchema),
	});

	//Function that handles submision of validated data
	const onSubmit = async (data: z.infer<typeof ProjectSchema>) => {
		console.log(data);
		// Submit the data to your API or perform any other action

	};

	const fileRef = form.register("image");


	return (
		<div className="px-5 md:px-20">
			<h1 className="font-semibold text-lg text-center my-5">Create a New Project</h1>


			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input placeholder="Project Title" {...field} />
								</FormControl>
								<FormDescription>

								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>


					<FormField
						control={form.control}
						name="co_authors"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Co Authors</FormLabel>
								<FormControl>
									<Input placeholder="Co Authors" {...field} />
								</FormControl>
								<FormDescription>

								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="category"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Category</FormLabel>
								<FormControl>
									<Input placeholder="Project Category" {...field} />
								</FormControl>
								<FormDescription>

								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>


					<FormField
						control={form.control}
						name="image"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Project Banner</FormLabel>
								<FormControl>

									<Input type="file" {...fileRef}{...field} onChange={(event) => {
										field.onChange(event.target?.files?.[0] ?? undefined);
									}}/>
								</FormControl>
								<FormDescription>

								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Tell us more about the project..."
										{...field}
									/>
								</FormControl>
								<FormDescription>
									{/* You can <span>@mention</span> other users and organizations to
							link to them. */}
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button size={"lg"} type="submit">Create Project</Button>
				</form>
			</Form>

		</div>
	);

};

export default ProjectPage;
