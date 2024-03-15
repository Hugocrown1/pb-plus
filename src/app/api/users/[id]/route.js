export async function GET(request, { params: { id } }) {
  try {
    await connectDB();
    const user = await Users.findById(id).populate("properties", {});

    return NextResponse.json(user);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(error.message, { status: 500 });
  }
}
