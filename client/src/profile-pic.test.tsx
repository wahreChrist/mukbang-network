import ProfilePic from "./profile-pic";

import { render, fireEvent } from "@testing-library/react";

it("when url is not passed it ends up default", () => {
    const { container } = render(
        <ProfilePic first={"first"} last="last" showUploader={() => {}} />
    );
    expect(
        container.querySelector("img").src.endsWith("/defaultProfilePic.jpg")
    ).toBe(true);
});
// untested

it("when a url is passed, the src is equal to that url", () => {
    const { container } = render(
        <ProfilePic
            url={"www.thisIsAUrl.com"}
            first={"first"}
            last="last"
            showUploader={() => {}}
        />
    );
    const imgElem = container.querySelector("img");
    expect(imgElem.src.endsWith("/defaultProfilePic.jpg")).toBe(false);
});

it("first and last passed via props get set as alt value", () => {
    const { container } = render(
        <ProfilePic first={"some"} last={"value"} showUploader={() => {}} />
    );
    const imgElem = container.querySelector("img");
    expect(imgElem.alt).toBe("some value");
});

it("onClick of img, we run the fn passed via props", () => {
    const mockedFnForOnClick = jest.fn(() => console.log("clicked!!!!"));
    const { container } = render(
        <ProfilePic
            first={"first"}
            last="last"
            showUploader={mockedFnForOnClick}
        />
    );
    const imgElem: HTMLImageElement = container.querySelector("img");
    // fire our event!
    fireEvent.click(imgElem);
    console.log("mockedFnForOnClick.mock", mockedFnForOnClick.mock);
    expect(mockedFnForOnClick.mock.calls.length).toBe(1);
});
