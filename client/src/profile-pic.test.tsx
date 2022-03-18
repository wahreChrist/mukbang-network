import ProfilePic from "./profile-pic";

import { render } from "@testing-library/react";

it("when url is not passed it ends up default", () => {
    const { container } = render(
        <ProfilePic first={"first"} last="last" showUploader={() => {}} />
    );
    expect(
        container.querySelector("img").src.endsWith("/defaultProfilePic.jpg")
    ).toBe(true);
});
